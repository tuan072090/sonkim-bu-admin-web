const Routers = {
    HOME: {
        path: "/",
        title: "Dashboard"
    },
    LOGIN: {
        path: "/dang-nhap",
        title: "Đăng nhập"
    },
    RESET_PASS: {
        path: "/doi-mat-khau",
        title:  "Đổi mật khẩu"
    },
    ORDERS: {
        path: '/orders',
        title: 'Đơn hàng'
    },
    PROFILE: {
        path: '/profile',
        title: 'Thông tin tài khoản'
    },
    ARTICLES:{
        path: '/articles',
        title: 'Bài viết'
    },
    ARTICLE_DETAIL:{
        path: '/articles/:id',
        title: 'Chi tiết bài viết'
    },
    PROMOTIONS: {
        path: '/promotions',
        title: 'Ưu đãi'
    },
    PROMOTION_DETAIL: {
        path: '/promotions/:id',
        title: 'Chi tiết ưu đãi'
    },
    PROMOTION_ORDERS: {
        path: '/promotion-orders',
        title: 'Đơn hàng ưu đãi'
    },
    STORES: {
        path: '/stores',
        title: 'Cửa hàng'
    },
    STORE_DETAIL: {
        path: '/stores/:id',
        title: 'Cửa hàng'
    },
    LOYALTY_PROGRAMS: {
        path: '/loyalty-programs',
        title: 'Chương trình thành viên'
    },
    LOYALTY_PROGRAM_DETAIL: {
        path: '/loyalty-programs/:id',
        title: 'Chương trình thành viên'
    },
    USERS: {
        path: '/users',
        title: 'Thành viên'
    },
    GIFTCARDS: {
        path: '/gift-cards',
        title: 'Thẻ quà tặng'
    },
    GIFTCARD_ORDERS: {
        path: '/gift-card-orders',
        title: 'Đơng hàng thẻ quà tặng'
    },
    TEST: {
        path: '/test',
        title: 'Test page'
    },
}

export default Routers
