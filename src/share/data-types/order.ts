export type OrderType = {
    admin_status: string
    billing_address: any
    cancel_reason: string
    created_at: string
    currency: string
    delivery_fee: number
    delivery_fee_discount: number
    email: string
    financial_status: string
    fulfillment_status: string
    id: number
    leader_id: number
    market_status: string
    name: string
    note: string
    number: number
    order_number: number
    products: any[]
    sale_order_log: any[]
    shipping_address: any
    subtotal_price: number
    tags: string
    taxes_included: boolean
    total_discounts: number
    total_items_price: number
    total_price: number
    total_tax: number
    total_weight: number
    updated_at: string
    user_id: number
    store_address: any
}
