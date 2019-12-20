exports.reqUpdateSchema = {
  type: 'object',
  required: ['findBy', 'data'],
  properties: {
    findBy: { type: 'string' },
    data: { type: 'object' }
  }
};
