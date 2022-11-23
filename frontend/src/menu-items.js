const menuItems = {
    items: [
        {
            id: 'navigation',
            title: 'Home',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home'
                },
            ]
        },
        {
            id: 'Shipment',
            title: 'Shipment',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'allshipment',
                    title: 'All Shipment',
                    type: 'item',
                    url: '/allshipment',
                    icon: 'feather icon-shopping-cart'
                },
                {
                    id: 'dispatch',
                    title: 'Dispatch And Shipment',
                    type: 'item',
                    url: '/shipmentdispatch',
                    icon: 'feather icon-trending-up'
                },
                {
                    id: 'manual',
                    title: 'Manual Assignment',
                    type: 'item',
                    url: '/manualassignment',
                    icon: 'feather icon-file-plus'
                },
                {
                    id: 'return',
                    title: 'Shipment to be Returned',
                    type: 'item',
                    url: '/shipmentreturned',
                    icon: 'feather icon-trending-down'
                },
                {
                    id: 'customer',
                    title: 'Customer',
                    type: 'item',
                    url: '/customer',
                    icon: 'feather icon-user',
                },
            ]
        },
        {
            id: 'ui-forms',
            title: 'Facility & Driver',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'warehouse',
                    title: 'Warehouse',
                    type: 'item',
                    url: '/warehouse',
                    icon: 'feather icon-file-text'
                },
                {
                    id: 'driver',
                    title: 'Driver',
                    type: 'item',
                    url: '/driver',
                    icon: 'feather icon-life-buoy'
                },
                {
                    id: 'codbalance',
                    title: 'COD Balance',
                    type: 'item',
                    url: '/codbalance',
                    icon: 'feather icon-server'
                }
            ]
        },
        {
            id: 'setting',
            title: 'Setting',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'ticket',
                    title: 'Ticket And Support',
                    type: 'item',
                    url: '/ticket&support',
                    icon: 'feather icon-pie-chart'
                },
                {
                    id: 'manage',
                    title: 'Manage User',
                    type: 'item',
                    url: '/manageuser',
                    icon: 'feather icon-users'
                },
                {
                    id: 'location',
                    title: 'Manage Location & Hub',
                    type: 'item',
                    url: '/location&hub',
                    icon: 'feather icon-map'
                }
            ]
        },       
    ]
};

export default menuItems;
