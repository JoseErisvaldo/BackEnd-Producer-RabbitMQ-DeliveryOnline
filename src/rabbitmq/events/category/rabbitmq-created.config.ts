export const RabbitEventsCreated = {
  CATEGORY_CREATED: {
    exchange: 'admin-dashboard-exchange',
    routingKey: 'category.criado',
    queue: 'fila-categorys',
  },
  ESTABLISHMENT_CREATED: {
    exchange: 'admin-dashboard-exchange',
    routingKey: 'establishment.criado',
    queue: 'fila-establishments',
  }
};
