import { Products, Appliance, Clothing, products } from "../../data/products.js";

describe ('Test Suite: Check class', () => {
  let products;
  beforeEach(()=> {
    products = new Clothing({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  })
  it('has the correct properties' , () => {
    expect(products.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(products.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(products.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(products.rating).toEqual({
        stars: 4.5,
        count: 87
      });
    expect(products.getPrice()).toEqual(`$10.90`);
    expect(products.extraInfoHTML()).toContain('Size Chart');
    expect(products.extraInfoHTML()).toContain('images/clothing-size-chart.png');
  })
})