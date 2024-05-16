import React from "react"

import "./style.css"

interface SaleDetails {
  details: string[]
  scrape_date: string
  shop_now_link: string
  subtitle: string
  title: string
  title_link: string
}

const salesData: SaleDetails[] = [
  {
    details: [
      "Saks Fifth Avenue offers up to 60% off The North Face Fashion Sale with code SAKSSALE.",
      "Enjoy Free Shipping on orders over $200 with code FREESHIP."
    ],
    scrape_date: "2024-05-13 21:36:55",
    shop_now_link:
      "https://www.saksfifthavenue.com/c/men/apparel/the-north-face",
    subtitle: "Up to 60% off",
    title: "The North Face Fashion Sale",
    title_link:
      "https://www.dealmoon.com/en/up-to-60-off-the-north-face-fashion-sale/4204192.html"
  },
  {
    details: [
      "Saks Fifth Avenue offers 40% off Saks Fifth Avenue Private Sale via code SAKSSALE.",
      "Besides, new customers can enjoy 10% off their first order with discount code ACCOUNT.",
      "Enjoy free shipping on orders of $200 or more by redeeming coupon code FREESHIP",
      "Deal expires on May 19th."
    ],
    scrape_date: "2024-05-13 21:34:38",
    shop_now_link: "https://www.saksfifthavenue.com/c/women-s-apparel",
    subtitle: "Up to 40% off",
    title: "Saks Fifth Avenue Private Sale",
    title_link:
      "https://www.dealmoon.com/en/up-to-40-off-saks-fifth-avenue-private-sale/4268610.html"
  },
  {
    details: [
      "Spring Flash Sale: Up to 75% off at Saks Fifth Avenue",
      "Mens Section, Womens Section, Beauty Section, Home Section, Kids Section",
      "New users can receive 10% off their initial beauty purchase through code ACCOUNTS, excluding some brands, with gift cards and stacked discounts excluded, and requiring cart addition for testing",
      "Orders over $200 within the US qualify for free shipping with coupon code ACCOUNTSF."
    ],
    scrape_date: "2024-05-13 21:32:39",
    shop_now_link: "https://www.saksfifthavenue.com/c/sale-2/sale",
    subtitle: "Up to 75% Off",
    title: "Saks Fifth Avenue Fashion Flash Sale",
    title_link:
      "https://www.dealmoon.com/en/up-to-75-off-saks-fifth-avenue-fashion-flash-sale/4169305.html"
  },
  {
    details: [
      "Saks Fifth Avenue offers up to 40% off the CDG Play Private Fashion Sale via code SAKSSALE.",
      "New customers can enjoy 10% off their first order with discount code ACCOUNTS",
      "Shop boldly with free shipping on orders exceeding $200 when you apply coupon code FREESHIP"
    ],
    scrape_date: "2024-05-13 21:20:06",
    shop_now_link:
      "https://www.saksfifthavenue.com/c/men/apparel/comme-des-gar%C3%A7ons-play",
    subtitle: "Upo to 40% off",
    title: "CDG Play Private Fashion Sale",
    title_link:
      "https://www.dealmoon.com/en/upo-to-40-off-cdg-play-private-fashion-sale/4271181.html"
  }
]

interface SaleItemProps {
  sale: SaleDetails
}

const SaleItem: React.FC<SaleItemProps> = ({ sale }) => (
  <div className="deals-card">
    <h2>
      <a href={sale.title_link} target="_blank" rel="noopener noreferrer">
        {sale.title}
      </a>
    </h2>
    <h3>{sale.subtitle}</h3>
    <ul>
      {sale.details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
    <a
      href={sale.shop_now_link}
      target="_blank"
      rel="noopener noreferrer"
      className="deals-button">
      Shop Now
    </a>
    <p>Scrape Date: {new Date(sale.scrape_date).toLocaleString()}</p>
  </div>
)

interface SalesListProps {
  sales: SaleDetails[]
}

const SalesList: React.FC<SalesListProps> = ({ sales }) => (
  <div className="deals-container">
    {sales.map((sale, index) => (
      <SaleItem key={index} sale={sale} />
    ))}
  </div>
)

const App: React.FC = () => (
  <div>
    <h1>Sales and Deals</h1>
    <SalesList sales={salesData} />
  </div>
)

export default App
