export default { title: 'Bootstrap Components/Navigation' };

export const Navbar = () => `
  <nav class="navbar navbar-expand bg-body border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Apertus</a>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Models</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Data</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Papers</a></li>
      </ul>
    </div>
  </nav>
`;
Navbar.parameters = { layout: 'fullscreen' };

export const TabsAndPills = () => `
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Overview</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Weights</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Data</a></li>
    <li class="nav-item"><a class="nav-link disabled" aria-disabled="true">Disabled</a></li>
  </ul>
  <ul class="nav nav-pills">
    <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Active pill</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Pill</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Pill</a></li>
  </ul>
`;

export const BreadcrumbAndPagination = () => `
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Models</a></li>
      <li class="breadcrumb-item active" aria-current="page">Apertus 1.5</li>
    </ol>
  </nav>
  <nav aria-label="Demo pagination">
    <ul class="pagination mb-0">
      <li class="page-item disabled"><a class="page-link">Previous</a></li>
      <li class="page-item active" aria-current="page"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
`;

export const ListGroupAndDropdown = () => `
  <div class="row">
    <div class="col-md-5">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active" aria-current="true">Active item</a>
        <a href="#" class="list-group-item list-group-item-action">Second item</a>
        <a href="#" class="list-group-item list-group-item-action">Third item</a>
        <a class="list-group-item list-group-item-action disabled" aria-disabled="true">Disabled item</a>
      </div>
    </div>
    <div class="col-md-4">
      <div class="dropdown-menu show position-static">
        <h6 class="dropdown-header">Section</h6>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item active" href="#">Active action</a>
        <hr class="dropdown-divider">
        <a class="dropdown-item" href="#">Separated action</a>
      </div>
    </div>
  </div>
`;

export const Accordion = () => `
  <div class="accordion" id="sbAccordion" style="max-width: 560px;">
    <div class="accordion-item">
      <h4 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sbAcc1" aria-expanded="true" aria-controls="sbAcc1">Open by default</button>
      </h4>
      <div id="sbAcc1" class="accordion-collapse collapse show" data-bs-parent="#sbAccordion">
        <div class="accordion-body">Active header uses the pale technical panel with an anthracite chevron.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h4 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sbAcc2" aria-expanded="false" aria-controls="sbAcc2">Second panel</button>
      </h4>
      <div id="sbAcc2" class="accordion-collapse collapse" data-bs-parent="#sbAccordion">
        <div class="accordion-body">Collapsed panels stay white with subtle borders.</div>
      </div>
    </div>
  </div>
`;
