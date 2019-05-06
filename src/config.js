class GenericContextModel {
  constructor({
    components_ = {},
    id_ = '',
    type_ = '',
    UID = '',
    _loaded = null,
    allow_discussion = false,
    contributors = [],
    created = null,
    creators = [],
    experts_assigned = '',
    id = '',
    is_folderish = true,
    items = '',
    items_total = 0,
    layout = '',
    modified = null,
    parent = '',
    review_state = '',
    rights = '',
    text = '',
    title = '',
    version = '',
    workspace = ''
  }) {
    this['@components'] = components_;
    this['@id'] = id_;
    this['@type'] = type_;
    this._loaded = _loaded;
    this.allow_discussion = allow_discussion;
    this.contributors = contributors;
    this.created = created;
    this.creators = creators;
    this.experts_assigned = experts_assigned;
    this.id = id;
    this.is_folderish = true;
    this.items = '';
    this.items_total = 0;
    this.layout = '';
    this.modified = null;
    this.parent = '';
    this.review_state = '';
    this.rights = '';
    this.text = '';
    this.title = '';
    this.version = '';
    this.workspace = '';
  }
}

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
    text = { data: '' },
    client = [],
    coordinators = [],
    expert_pool = [],
    workspace = 'case'
  }) {
    this['@type'] = type;
    this.title = title;
    this.description = description;
    this.text = text;
    this.client = client;
    this.coordinators = coordinators;
    this.expert_pool = expert_pool;
    this.workspace = workspace;
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
  GenericContextModel: GenericContextModel,
  ContributionModel: ContributionModel,
  CaseModel: CaseModel
};
