class ContributionModel {
  // ContributionModel for editing. The real content object has much more
  // attributes.
  constructor({
    type = '',
    title = '',
    text = { data: '' },
    experts_assigned = [],
    workspace = ''
  }) {
    this['@type'] = type;
    this.title = title;
    this.text = text;
    this.experts_assigned = experts_assigned;
    this.workspace = workspace;
  }
}

class CaseModel {
  // CaseModel for editing. The real content object has much more attributes.
  constructor({
    type = '',
    title = '',
    description = '',
    text = '',
    client = [],
    coordinators = [],
    expert_pool = []
  }) {
    this['@type'] = type;
    this.title = title;
    this.description = description;
    this.text = text;
    this.client = client;
    this.coordinators = coordinators;
    this.expert_pool = expert_pool;
  }
}

class ThreadModel {
  constructor({
    id = '',
    items = [],
  }) {
    this['@id'] = id;
    this.items = items;
  }
}

export default {
  // baseURI: 'http://matt.zoplo.com:35180/Plone',
  baseURI: 'http://localhost:8080/Plone',
  basePath: '/Plone',
  ContributionModel: ContributionModel,
  CaseModel: CaseModel
};
