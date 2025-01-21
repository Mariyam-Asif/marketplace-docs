//product schema

export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
      { name: 'id', type: 'string', title: 'ID', description: 'Unique identifier for the product' },
      { name: 'name', type: 'string', title: 'Name', description: 'Name of the product' },
      { name: 'price', type: 'number', title: 'Price', description: 'Cost per unit' },
      { name: 'stock', type: 'number', title: 'Stock', description: 'Quantity available' },
      { name: 'category', type: 'string', title: 'Category', description: 'Product classification (e.g., Electronics)' },
      { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }], description: 'Keywords for search' },
    ],
  };
  

//order schema
export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
      { name: 'orderId', type: 'string', title: 'Order ID', description: 'Unique identifier for the order' },
      {
        name: 'customerInfo',
        type: 'object',
        title: 'Customer Info',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'contact', type: 'string', title: 'Contact Info' },
          { name: 'address', type: 'string', title: 'Address' },
        ],
      },
      {
        name: 'productDetails',
        type: 'array',
        title: 'Product Details',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'productId', type: 'reference', to: [{ type: 'product' }] },
              { name: 'quantity', type: 'number', title: 'Quantity' },
              { name: 'price', type: 'number', title: 'Price' },
            ],
          },
        ],
      },
      { name: 'status', type: 'string', title: 'Status', options: { list: ['Pending', 'Shipped', 'Delivered'] } },
      { name: 'timestamp', type: 'datetime', title: 'Timestamp', description: 'Order placement date and time' },
    ],
  };
  

//customer schema
export default {
    name: 'customer',
    type: 'document',
    title: 'Customer',
    fields: [
      { name: 'customerId', type: 'string', title: 'Customer ID', description: 'Unique identifier' },
      { name: 'name', type: 'string', title: 'Name', description: 'Full name of the customer' },
      { name: 'contactInfo', type: 'string', title: 'Contact Info', description: 'Phone number and email address' },
      { name: 'address', type: 'string', title: 'Address', description: 'Delivery address' },
      {
        name: 'orderHistory',
        type: 'array',
        title: 'Order History',
        of: [{ type: 'reference', to: [{ type: 'order' }] }],
      },
    ],
  }
  
//delivery zone schema
export default {
  name: 'deliveryZone',
  type: 'document',
  title: 'Delivery Zone',
  fields: [
    { name: 'zoneName', type: 'string', title: 'Zone Name', description: 'Name of the delivery zone' },
    { name: 'coverageArea', type: 'string', title: 'Coverage Area', description: 'Geographic area covered by this zone' },
    {
      name: 'assignedDrivers',
      type: 'array',
      title: 'Assigned Drivers',
      of: [{ type: 'string' }],
      description: 'List of drivers assigned to this zone by their names or IDs',
    },
  ],
};

//shipment schema
export default {
  name: 'shipment',
  type: 'document',
  title: 'Shipment',
  fields: [
    { name: 'shipmentId', type: 'string', title: 'Shipment ID', description: 'Unique identifier for the shipment' },
    { name: 'orderId', type: 'reference', to: [{ type: 'order' }], title: 'Order ID', description: 'Reference to the related order' },
    { name: 'status', type: 'string', title: 'Status', options: { list: ['Pending', 'Shipped', 'In Transit', 'Delivered'] }, description: 'Current shipment status' },
    { name: 'deliveryDate', type: 'datetime', title: 'Delivery Date', description: 'Estimated or actual delivery date of the shipment' },
  ],
};
