const DEVELOPMENT = process.env.NODE_ENV === 'development';


const PERMISSION_MAP = {
  'add': 'Add portal content',
  'add_contribution': 'bda.empower: Add Contribution',
  'add_case': 'bda.empower: Add Case',
  'modify': 'Modify portal content',
  'modify_client': 'bda.empower: Modify Client',
  'modify_expert_pool': 'bda.empower: Modify Expert Pool',
  'modify_coordinators': 'bda.empower: Modify Coordinators',
  'modify_experts_assigned': 'bda.empower: Modify Experts Assigned',
  'modify_workspace_type': 'bda.empower: Modify Workspace Type',
  'delete': 'Delete objects',
}


// These content models define what can be submitted to the server for POST/PATCH requests.
//
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
    this.review_state = '';
    this.rights = '';
    this.text = '';
    this.title = '';
    this.version = '';
    this.workspace = '';
  }
}

class ContributionModel {
  constructor({
    title = '',
    text = { data: '' },
    experts_assigned = [],
    workspace = '',
  }) {
    this['@type'] = 'Contribution';
    this.title = title;
    this.text = text;
    this.experts_assigned = experts_assigned;
    this.workspace = workspace;
  }
}

class CaseModel {
  constructor({
    title = '',
    description = '',
    text = { data: '' },
    client = [],
    coordinators = [],
    expert_pool = [],
    workspace = 'case',
  }) {
    this['@type'] = 'Case';
    this.title = title;
    this.description = description;
    this.text = text;
    this.client = client;
    this.coordinators = coordinators;
    this.expert_pool = expert_pool;
    this.workspace = workspace;
  }
}

export default {
  DEVELOPMENT: DEVELOPMENT,
  PERMISSION_MAP: PERMISSION_MAP,
  // baseURI: 'http://matt.zoplo.com:35180/Plone',
  //baseURI: 'http://localhost:8080/Plone',
  //basePath: '/Plone',
  baseURI: 'http://localhost:8080/p',
  basePath: '/p',
  GenericContextModel: GenericContextModel,
  ContributionModel: ContributionModel,
  CaseModel: CaseModel,
  inline_types: ['Image', 'File'],
  portal_messages: {
    LOGIN_ERROR_TITLE: 'Login Error',
    LOGIN_ERROR_TEXT: 'Could not login'
  }
};
