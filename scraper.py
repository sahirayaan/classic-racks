import urllib.request
import re
import json
import os
from urllib.parse import urljoin

base_url = "https://www.displayrack.co.in/"
main_url = urljoin(base_url, "display-racks-and-supermarket-rack.html")

def fetch_html(url):
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    with urllib.request.urlopen(req, timeout=10) as response:
        return response.read().decode('utf-8', errors='ignore')

def get_categories():
    html = fetch_html(main_url)
    
    # Extract all <a href="...">text</a> tags
    matches = re.findall(r"<a[^>]*href=['\"]([^'\"]+\.html)['\"][^>]*>(.*?)<\/a>", html, re.DOTALL)
    
    categories = []
    seen = set()
    
    exclude_pages = {
        'profile.html', 'enquiry.html', 'corporate-brochure.html', 
        'corporate-presentation.html', 'testimonial.html', 'infrastructure.html', 
        'quality.html', 'sitemap.html', 'franchisee.html', 'index.html',
        'display-racks-and-supermarket-rack.html'
    }
    
    keywords = ['rack', 'shelf', 'shelves', 'gondola', 'counter', 'stand', 'basket', 'trolley', 'desk', 'bin', 'angle', 'unit', 'desk']
    
    for href, inner_html in matches:
        filename = href.split('/')[-1]
        if filename in exclude_pages:
            continue
            
        if not any(kw in filename.lower() for kw in keywords):
            continue
            
        url = urljoin(base_url, href)
        if url not in seen:
            seen.add(url)
            
            # Clean inner HTML to get text
            text = re.sub(r'<[^>]+>', ' ', inner_html)
            text = re.sub(r'\s+', ' ', text).strip()
            
            # Remove trailing numbers like (23) or (15)
            text = re.sub(r'\s*\(\d+\)', '', text).strip()
            
            # Check if name is empty or weird
            if not text or len(text) < 3 or len(text) > 45 or 'view all' in text.lower():
                name = filename.replace('.html', '').replace('-', ' ').title()
            else:
                name = text
                
            categories.append({'name': name, 'url': url})
            
    return categories

seen_ids = set()

def parse_category_page(cat):
    global seen_ids
    print(f"Scraping category: {cat['name']}...")
    try:
        html = fetch_html(cat['url'])
    except Exception as e:
        print(f"Failed to fetch {cat['url']}: {e}")
        return []

    segments = html.split("ImgCon")
    if len(segments) <= 1:
        return []

    products = []
    for i in range(1, len(segments)):
        prev_segment = segments[i-1]
        curr_segment = segments[i]
        
        name = "Unknown Product"
        search_area = prev_segment[-1000:]
        headings = re.findall(r"<(?:h[2-4]|a|span|p)[^>]*>(.*?)</(?:h[2-4]|a|span|p)>", search_area, re.DOTALL)
        if headings:
            valid_headings = [re.sub(r'<[^>]+>', '', h).strip() for h in headings]
            valid_headings = [h for h in valid_headings if 3 < len(h) < 100 and "Get Quote" not in h and "Our Products" not in h and "View all" not in h]
            if valid_headings:
                name = valid_headings[-1]

        img_match = re.search(r"<img[^>]*dataimg=['\"]([^'\"]+)['\"]", curr_segment)
        if not img_match:
            img_match = re.search(r"<img[^>]*data-bimg=['\"]([^'\"]+)['\"]", curr_segment)
        if not img_match:
            img_match = re.search(r"<img[^>]*src=['\"]([^'\"]+)['\"]", curr_segment)

        image_url = ""
        if img_match:
            image_url = urljoin(base_url, img_match.group(1))

        price = ""
        price_match = re.search(r"Rs\s*[\d,]+(?:\s*/\s*[a-zA-Z]+)?", curr_segment)
        if price_match:
            price = price_match.group(0)

        details = {}
        table_match = re.search(r"<table[^>]*>(.*?)</table>", curr_segment, re.DOTALL)
        if table_match:
            table_html = table_match.group(1)
            rows = re.findall(r"<tr[^>]*>(.*?)</tr>", table_html, re.DOTALL)
            for row in rows:
                cols = re.findall(r"<t[d|h][^>]*>(.*?)</t[d|h]>", row, re.DOTALL)
                if len(cols) >= 2:
                    k = re.sub(r'<[^>]+>', '', cols[0]).replace(':', '').strip()
                    v = re.sub(r'<[^>]+>', '', cols[1]).strip()
                    if k and v:
                        details[k] = v

        description = ""
        desc_area = curr_segment.split("</table>")[-1] if table_match else curr_segment
        desc_match = re.findall(r"<p[^>]*>(.*?)</p>", desc_area, re.DOTALL)
        for p in desc_match:
            clean_p = re.sub(r'<[^>]+>', '', p).strip()
            if len(clean_p) > 40 and "Price" not in clean_p and "Quote" not in clean_p:
                description = clean_p
                break
        
        if not description:
            clean_text = re.sub(r'<[^>]+>', ' ', desc_area)
            clean_text = re.sub(r'\s+', ' ', clean_text).strip()
            words = clean_text.split()
            if len(words) > 10:
                description = " ".join(words[:25]) + "..."

        features = [
            "Premium quality finish",
            "Highly durable structural frame",
            "Corrosion-resistant powder coating"
        ]
        if "Features" in details:
            features = [f.strip() for f in details["Features"].split(",") if f.strip()]
        
        base_id = re.sub(r'\W+', '-', (cat['name'] + "-" + name).lower()).strip('-')
        prod_id = base_id
        counter = 1
        while prod_id in seen_ids:
            prod_id = f"{base_id}-{counter}"
            counter += 1
        seen_ids.add(prod_id)
        
        products.append({
            "id": prod_id,
            "name": name,
            "category": re.sub(r'\W+', '-', cat['name'].lower()).strip('-'),
            "categoryLabel": cat['name'],
            "description": description.replace('\r', '').replace('\n', ' ').strip(),
            "specifications": details,
            "features": features,
            "image": image_url
        })
    return products

def main():
    categories = get_categories()
    print(f"Found {len(categories)} categories.")
    
    all_products = []
    for cat in categories:
        products = parse_category_page(cat)
        print(f"  Extracted {len(products)} products.")
        all_products.extend(products)
        
    print(f"Total products extracted: {len(all_products)}")
    
    output_path = os.path.join(os.path.dirname(__file__), "src", "data", "products.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding='utf-8') as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    main()
