/*
|--------------------------------------------------------------------------------------------------------------------
|   Modules Configuration File
|--------------------------------------------------------------------------------------------------------------------
|
|   * All modules listing configured in this file.
|   * title => value will be shown as title for this module.
|   * dashboard => set to true will show the module into dashboard.
|   * sidebar => set to true will show the module into sidebar.
|   * permissions => set to array with four types of permissions ['add', 'edit', 'delete', 'view'] will show this module into sub-admins module for giving permissions to particalar 
|     Sub Admins.
|   * icon => icon class specified here.
|   * link => link for the module.
|   * count => count selector from admin dashboard method in controller or count value in integer.
|   * sidebarAnchorClass => to set class on the anchor attached to the sidebar link for single link element like "Logout" or "Dashboard"
*/

global.modules = {
    'admin': {
        'dashboard': {
            'title': 'Dashboard',
            'dashboard': false,
            'sidebar': true,
            'permissions': [],
            'icon': 'fas fa-fire',
            'link': '/admin/dashboard',
            'count': 1
        },
        'user': {
            'title': 'User',
            'dashboard': true,
            'dashboardLink': '/admin/user/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'far fa-user',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/user/listing',
                    'subModule': 'listing',
                },
                // {
                //     'title': 'Add',
                //     'link': '/admin/user/add',
                //     'subModule': 'add'
                // },
            ],
            'count': 'user'
        },
        'driver': {
            'title': 'Driver',
            'dashboard': false,
            'sidebar': false,
            'permissions': false,
            'icon': 'fas fa-taxi',
            'link': '/admin/user/listing',
            'count': 'driver'
        },
        'vendor': {
            'title': 'Seller',
            'dashboard': true,
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-store',
            'dashboardLink': '/admin/vendor/listing',
            // 'link': '/admin/user/listing',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/vendor/listing',
                    'subModule': 'listing',
                },
                // {
                //     'title': 'Add',
                //     'link': '/admin/vendor/add',
                //     'subModule': 'add'
                // },
            ],
            'count': 'vendor'
        },

        'category': {
            'title': 'Category',
            'dashboard': true,
            'dashboardLink': '/admin/category/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-list',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/category/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/category/add',
                    'subModule': 'add'
                },
            ],
            'count': 'category'
        },


        'blog_category': {
            'title': 'Blog Category',
            'dashboard': true,
            'dashboardLink': '/admin/blog_category/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-blog',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/blog_category/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/blog_category/add',
                    'subModule': 'add'
                },
            ],
            'count': 'blog_category'
        },

        'subCategory': {
            'title': 'Subcategory',
            'dashboard': true,
            'dashboardLink': '/admin/subCategory/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-file',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/subCategory/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/subCategory/add',
                    'subModule': 'add'
                },
            ],
            'count': 'subCategory'
        },
        'brand': {
            'title': 'Brand',
            'dashboard': true,
            'dashboardLink': '/admin/brand/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-socks',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/brand/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/brand/add',
                    'subModule': 'add'
                },
            ],
            'count': 'brand'
        },
        'banner': {
            'title': 'Banner',
            'dashboard': true,
            'dashboardLink': '/admin/banner/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-flag',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/banner/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/banner/add',
                    'subModule': 'add'
                },
            ],
            'count': 'banner'
        },
        'blog': {
            'title': 'Blog',
            'dashboard': true,
            'dashboardLink': '/admin/blog/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-atom',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/blog/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/blog/add',
                    'subModule': 'add'
                },
            ],
            'count': 'blog'
        },
        'approvalRequests': {
            'title': 'Product Approval Requests',
            'dashboard': true,
            'sidebar': false,
            'permissions': false,
            'icon': 'fas fa-cubes',
            'link': '/admin/product/approvalRequests',
            'count': 'approvalRequests'
        },
        'product': {
            'title': 'Product',
            'dashboard': true,
            'dashboardLink': '/admin/product/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-cubes',
            'link': [
                {
                    'title': 'Approval Requests',
                    'link': '/admin/product/approvalRequests',
                    'subModule': 'approvalRequests',
                },
                {
                    'title': 'Listing',
                    'link': '/admin/product/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/product/add',
                    'subModule': 'add'
                },
                {
                    'title': 'featured_product',
                    'link': '/admin/product/featured_product',
                    'subModule': 'add'
                },

                // {
                //     'title': 'Import Products',
                //     'link': 'javascript:void(0)',
                //     'subModule': 'importProductExcel',
                //     'class': 'importProductExcel'
                // },
                // {
                //     'title': 'Import Products Images',
                //     'link': 'javascript:void(0)',
                //     'subModule': 'importProductImages',
                //     'class': 'importProductImages'
                // },
            ],
            'count': 'product'
        },
        'order': {
            'title': 'Order',
            'dashboard': true,
            // 'dashboardLink': '/admin/order/customerOrders',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-truck',
            'link': [
                {
                    'title': 'Customer Orders',
                    'link': '/admin/order/customerOrders',
                    'subModule': 'customerOrders',
                    'dashboard': true,
                    'icon': 'fas fa-user',
                    'count': 'order'
                },
                // {
                //     'title': 'Seller Orders',
                //     'link': '/admin/order/sellerOrders',
                //     'subModule': 'sellerOrders',
                //     'dashboard': true,
                //     'icon': 'fas fa-truck',
                //     'count': 'order'
                // },
                // {
                //     'title': 'Cancellation Requests',
                //     'link': '/admin/order/cancellationRequests',
                //     'subModule': 'cance'link':llationRequests',
                //     'dashboard': true,
                //     'dashboardTitle': 'Order Cancellation Requests',
                //     'icon': 'fas fa-truck',
                //     'count': 'orderCancellationRequest'
                // },
                {
                    'title': 'Refund Requests',
                    'link': '/admin/order/refundRequests',
                    'subModule': 'refundRequests',
                    'dashboard': true,
                    'dashboardTitle': 'Order Refund Requests',
                    'icon': 'fas fa-truck',
                    'count': 'orderRefundRequest'
                },
                {
                    'title': 'Withdrawal Requests',
                    'link': '/admin/order/withdrawalRequests',
                    'subModule': 'withdrawalRequests',
                    'dashboard': true,
                    'dashboardTitle': 'Order Withdrawal Requests',
                    'icon': 'fas fa-truck',
                    'count': 'orderWithdrawalRequests'
                },
            ],
            'count': 'order'
        },
        'chat': {
            'title': 'Chat',
            'dashboard': false,
            'sidebar': true,
            'permissions': ['view', 'edit'],
            'icon': 'fas fa-comments',
            'link': '/admin/chatList',
            //'count': 'chatList'
        },

        'payment': {
            'title': 'payment',
            'dashboard': false,
            'dashboardLink': '/admin/payment/listing',
            'sidebar': false,
            'permissions': true,
            'icon': 'fas fa-list',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/payment/listing',
                    'subModule': 'listing',
                },

            ],
            'count': 'payment'
        },
        // 'report': {
        //     'title': 'Report',
        //     'dashboard': true,
        //     // 'dashboardLink': '/admin/report/salesReport',
        //     'sidebar': true,
        //     'permissions': true,
        //     'icon': 'fas fa-list-alt',
        //     'link': [
        //         {
        //             'title': 'Sales Report',
        //             'link': '/admin/report/salesReport',
        //             'subModule': 'salesReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'salesReport'
        //         },
        //         {
        //             'title': 'User Report',
        //             'link': '/admin/report/userReport',
        //             'subModule': 'userReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'userReport'
        //         },
        //         {
        //             'title': 'Seller Report',
        //             'link': '/admin/report/sellerReport',
        //             'subModule': 'sellerReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'sellerReport'
        //         },
        //         {
        //             'title': 'Tax Report',
        //             'link': '/admin/report/taxReport',
        //             'subModule': 'taxReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'taxReport'
        //         },
        //         {
        //             'title': 'Commission Report',
        //             'link': '/admin/report/commissionReport',
        //             'subModule': 'commissionReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'commissionReport'
        //         },
        //         {
        //             'title': 'Revenue Report',
        //             'link': '/admin/report/revenueReport',
        //             'subModule': 'revenueReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'revenueReport'
        //         },
        //     ],
        //     'count': 'order'
        // },
        // 'feedback': {
        //     'title': 'Feedback',
        //     'dashboard': false,
        //     'dashboardLink': '/admin/feedback',
        //     'sidebar': true,
        //     'permissions': false,
        //     'icon': 'fas fa-comments',
        //     'link': '/admin/feedback',
        //     'count': 'feedback'
        // },
        // 'pushNotification': {
        //     'title': 'Push Notification',
        //     'dashboard': false,
        //     'dashboardLink': '/admin/pushNotification',
        //     'sidebar': true,
        //     'permissions': false,
        //     'icon': 'fas fa-bell',
        //     'link': '/admin/pushNotification',
        //     'count': 'pushNotification'
        // },
        'faq': {
            'title': 'Faq',
            'dashboard': true,
            'dashboardLink': '/admin/faq/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-question',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/admin/faq/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/admin/faq/add',
                    'subModule': 'add'
                },
            ],
            'count': 'faq'
        },
        'page': {
            'title': 'Page',
            'dashboard': false,
            'dashboardLink': 'javascript:void(0)',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-feather-alt',
            'link': [
                {
                    'title': 'Terms And Conditions',
                    'link': '/admin/page/termsAndConditions',
                    'subModule': 'termsAndConditions'
                },
                {
                    'title': 'Privacy Policy',
                    'link': '/admin/page/privacyPolicy',
                    'subModule': 'privacyPolicy'
                },
                {
                    'title': 'About Us',
                    'link': '/admin/page/aboutUs',
                    'subModule': 'aboutUs'
                },
                {
                    'title': 'Shipping Information',
                    'link': '/admin/page/shippingInformation',
                    'subModule': 'shippingInformation'
                },
                {
                    'title': 'Returns & Exchanges',
                    'link': '/admin/page/returnandexchange',
                    'subModule': 'returnandexchange'
                },
                {
                    'title': 'Free Shipping and Returns',
                    'link': '/admin/page/freeShippingAndReturn',
                    'subModule': 'freeShippingAndReturn'
                },
                {
                    'title': 'Loyality Program',
                    'link': '/admin/page/loyalityProgram',
                    'subModule': 'loyalityProgram'
                },
                {
                    'title': 'Copyright Policy',
                    'link': '/admin/page/copyrightPolicy',
                    'subModule': 'copyrightPolicy'
                },
                {
                    'title': 'Safety and Security Badges',
                    'link': '/admin/page/safetyAndSecurity',
                    'subModule': 'safetyAndSecurity'
                },
                
            ],
            'count': 7
        },
        'setting': {
            'title': 'Setting',
            'dashboard': false,
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-cog',
            'link': '/admin/setting',
            'count': 1
        },
        'logout': {
            'title': 'Log Out',
            'dashboard': false,
            'sidebar': true,
            'sidebarAnchorClass': 'logout_btn',
            'permissions': false,
            'icon': 'fas fa-sign-out-alt',
            'color': 'bg-blue',
            'link': '/admin/logout',
            'count': 1
        },
    },
    'sellerAdmin': {
        'dashboard': {
            'title': 'Dashboard',
            'dashboard': false,
            'sidebar': true,
            'permissions': [],
            'icon': 'fas fa-fire',
            'link': '/sellerAdmin/dashboard',
            'count': 1
        },
        // 'manageShop': {
        //     'title': 'Manage Shop',
        //     'dashboard': true,
        //     'sidebar': true,
        //     'permissions': ['view', 'edit'],
        //     'icon': 'fas fa-store',
        //     'link': '/sellerAdmin/manageShop',
        //     'count': 1
        // },
        // 'staffManagement': {
        //     'title': 'Staff Management',
        //     'dashboard': true,
        //     'dashboardLink': '/sellerAdmin/staffManagement/listing',
        //     'sidebar': true,
        //     'permissions': [],
        //     'icon': 'fas fa-user',            
        //     'link': [
        //         {
        //             'title': 'Listing',
        //             'link': '/sellerAdmin/staffManagement/listing',
        //             'subModule': 'listing',
        //         },
        //         {
        //             'title': 'Add',
        //             'link': '/sellerAdmin/staffManagement/add',
        //             'subModule': 'add',
        //         },
        //     ],
        //     'count': 'staffManagement'
        // },
        'product': {
            'title': 'Product',
            'dashboard': true,
            'dashboardLink': '/sellerAdmin/product/listing',
            'sidebar': true,
            'permissions': ['view', 'add', 'edit', 'delete'],
            'icon': 'fas fa-cubes',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/sellerAdmin/product/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/sellerAdmin/product/add',
                    'subModule': 'add',
                    'permissions': ['add'],
                },
            ],
            'count': 'product'
        },
        'orders': {
            'title': 'Orders',
            'dashboard': true,
            'dashboardLink': '/sellerAdmin/orders',
            'sidebar': true,
            'permissions': ['view', 'edit'],
            'icon': 'fas fa-truck',
            'link': [
                {
                    'title': 'Customer Orders',
                    'link': '/sellerAdmin/order/customerOrders',
                    'subModule': 'customerOrders',
                    'dashboard': true,
                    'icon': 'fas fa-user',
                    'count': 'order'
                },
                // {
                //     'title': 'Refund Requests',
                //     'link': '/sellerAdmin/order/refundRequests',
                //     'subModule': 'refundRequests',
                //     'dashboard': true,
                //     'dashboardTitle': 'Order Refund Requests',
                //     'icon': 'fas fa-truck',
                //   'count': 'orderRefundRequest'
                //  },
                //  {
                //     'title': 'Withdrawal Requests',
                //     'link': '/sellerAdmin/order/withdrawalRequests',
                //     'subModule': 'withdrawalRequests',
                //     'dashboard': true,
                //     'dashboardTitle': 'Order Withdrawal Requests',
                //     'icon': 'fas fa-truck',
                //     'count': 'orderWithdrawalRequests'
                // },
            ],
            'count': 'order'
        },
        'bank': {
            'title': 'Bank',
            'dashboard': true,
            'dashboardLink': '/SellerAdmin/bank/listing',
            'sidebar': true,
            'permissions': true,
            'icon': 'fas fa-list',
            'link': [
                {
                    'title': 'Listing',
                    'link': '/sellerAdmin/bank/listing',
                    'subModule': 'listing',
                },
                {
                    'title': 'Add',
                    'link': '/sellerAdmin/bank/add',
                    'subModule': 'add'
                },
            ],
            'count': 'bank'
        },
        'wallet': {
            'title': 'Withdrawal Requests',
            'dashboard': true,
            'sidebar': true,
            'icon': 'fas fa-wallet',
            'link': '/sellerAdmin/wallet',
            'count': 'wallet'
        },

        // 'earnings': {
        //     'title': 'Earnings',
        //     'dashboard': false,
        //     'sidebar': true,
        //     'permissions': ['view', 'edit'],
        //     'icon': 'fas fa-truck',
        //     'link': '/sellerAdmin/earnings',
        //     'count': 'earnings'
        // },
        'cancellationRequests': {
            'title': 'Cancellation Requests',
            'dashboard': false,
            'sidebar': false,
            'permissions': [],
            'icon': 'fas fa-ban',
            'link': '/sellerAdmin/cancellationRequests',
            'count': 'cancellationRequests'
        },
        'orderReturnRequests': {
            'title': 'Return & Refund Requests',
            'dashboard': false,
            'sidebar': false,
            'permissions': [],
            'icon': 'fas fa-undo-alt',
            'link': '/sellerAdmin/orderReturnRequests',
            'count': 'orderReturnRequests'
        },
        // 'taxCategory': {
        //     'title': 'Tax Category',
        //     'dashboard': true,
        //     'dashboardLink': '/sellerAdmin/taxCategory/listing',
        //     'sidebar': true,
        //     'permissions': false,
        //     'icon': 'fas fa-hand-holding-usd',
        //     'link': [
        //         {
        //             'title': 'Listing',
        //             'link': '/sellerAdmin/taxCategory/listing',
        //             'subModule': 'listing',
        //         },
        //         {
        //             'title': 'Add',
        //             'link': '/sellerAdmin/taxCategory/add',
        //             'subModule': 'add'
        //         },
        //     ],
        //     'count': 'taxCategory'
        // },
        // 'report': {
        //     'title': 'Report',
        //     'dashboard': true,
        //     // 'dashboardLink': '/admin/report/salesReport',
        //     'sidebar': true,
        //     'permissions': ['view'],
        //     'icon': 'fas fa-list-alt',
        //     'link': [
        //         {
        //             'title': 'Sales Report',
        //             'link': '/sellerAdmin/report/salesReport',
        //             'subModule': 'salesReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'salesReport'
        //         },
        //         {
        //             'title': 'Tax Report',
        //             'link': '/sellerAdmin/report/taxReport',
        //             'subModule': 'taxReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'taxReport'
        //         },
        //         {
        //             'title': 'Total Income Report',
        //             'link': '/sellerAdmin/report/totalIncomeReport',
        //             'subModule': 'totalIncomeReport',
        //             'dashboard': true,
        //             'icon': 'fas fa-list-alt',
        //             'count': 'totalIncomeReport'
        //         },
        //     ],
        //     'count': 'order'
        // },
        'setting': {
            'title': 'Setting',
            'dashboard': false,
            'sidebar': true,
            'permissions': ['view', 'add', 'edit', 'delete'],
            'icon': 'fas fa-cog',
            'link': '/sellerAdmin/setting',
            'count': 1
        },
        'logout': {
            'title': 'Log Out',
            'dashboard': false,
            'sidebar': true,
            'sidebarAnchorClass': 'logout_btn',
            'permissions': [],
            'icon': 'fas fa-sign-out-alt',
            'color': 'bg-blue',
            'link': '/sellerAdmin/logout',
            'count': 1
        },
    }
};

module.exports = modules;