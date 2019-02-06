class ContributionModel {
  // ContributionModel for editing. The real content object has much more
  // attributes.
  constructor({
    title,
    text,
    experts_assigned
  }) {
    this.title = title;
    this.text = text;
    this.experts_assigned = experts_assigned;
  }
}

class CaseModel {
  // CaseModel for editing. The real content object has much more attributes.
  constructor({
    title,
    description,
    text,
    client,
    coordinators,
    expert_pool
  }) {
    this.title = title;
    this.description = description;
    this.text = text;
    this.client = client;
    this.coordinators = coordinators;
    this.expert_pool = expert_pool;
  }
}

export default {
  // baseURI: 'http://matt.zoplo.com:35180/Plone',
  baseURI: 'http://localhost:8080/Plone',
  basePath: '/Plone',
  ContributionModel: ContributionModel,
  CaseModel: CaseModel
};
