const icons = {
  // Existing icons
  delete: 'bi-trash',
  edit: 'bi-pencil',
  add: 'bi-plus-circle',
  copy: 'bi-clipboard',
  home: 'bi-house',
  user: 'bi-person',
  dashboard: 'bi-speedometer2',
  settings: 'bi-gear',
  grid:'bi-grid',

  // Feature section icons
  link: 'bi-link-45deg',
  cpu: 'bi-cpu',
  table: 'bi-table',
  tools: 'bi-tools',
  
  // Navigation icons
  chevronRight: 'bi-chevron-right',
  chevronLeft: 'bi-chevron-left',
  chevronDown: 'bi-chevron-down',
  chevronUp: 'bi-chevron-up',
  menu: 'bi-list',
  
  // Action icons
  search: 'bi-search',
  share: 'bi-share',
  graph: 'bi-graph-up',
  clipboard: 'bi-clipboard',
  clipboardCheck: 'bi-clipboard-check',
  
  // Alert/Status icons
  check: 'bi-check-circle',
  error: 'bi-exclamation-triangle',
  info: 'bi-info-circle',
  warning: 'bi-exclamation-circle'
};

const iconHelper = {
  render(name, additionalClasses = '') {
    const iconClass = icons[name] || name;
    return `<i class="bi ${iconClass} ${additionalClasses}"></i>`;
  }
};

module.exports = iconHelper;