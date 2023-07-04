export const mainHtmlConstant = `
<div class="container">
<div class="table-container">
<div class="table-wrapper">
  <h1>Latest members transactions</h1>
  <div class="table-wrapper__column">Customer</div>
  <div class="table-wrapper__column">Email</div>
  <div class="table-wrapper__column">Date</div>
  <div class="table-wrapper__column">Amount</div>
  <div class="table-wrapper__column">Status</div>
  </div>
  </div>
  <div class="table-container">
  <div class="table-wrapper">
  <h1>New members</h1>
  <img
  src="./public/assets/perfil.jpg"
  alt="profile"
  width="50px"
  height="50px"
  style="border-radius: 50%" />
  <p>fakeemail@gmail.com</p>
  <button type="button">Display</button>
  </div>
  </div>
  </div>`;

export const form = `
<button class="material-symbols-outlined arrow-button">West</button>
<div class="form-container">
  <h1>Create new user</h1>
  <form id="form">
    <div class="input-form-container">
      <label id="name"> Name </label>
      <input type="text" placeholder="name.." name="name" id="name" required/>
    </div>
    <div class="input-form-container">
      <label id="lastname"> Last name </label>
      <input type="text" placeholder="last name..." name="lastname" id="lastname" required/>
    </div>
    <div class="input-form-container">
      <label id="email"> email </label>
      <input type="text" placeholder="email..." name="email" id="email" required/>
    </div>
    <div class="input-form-container">
    <p>Choose role</p>
    <div>
    <input type="radio" id="cadete" name="role" value="Cadete" required/>
    <label for="Cadete" > Cadete </label>
    </div>
    <div>
    <input type="radio" id="Socio" name="role" value="Socio" required/>
    <label for="Socio" > Socio </label>
    </div>
    <div>
    <input type="radio" id="Adherente" name="role" value="Adherente" required/>
    <label for="Adherente" > Adherente </label>
    </div>
    </div>
    <button type="submit" id="form-button">Create</button>
  </form>
</div>`;

export const manageUsersHtml = `
<div class="manage-users-table">
<div class="manage-users-table__column">| users</div>
<div class="manage-users-table__column">| email</div>
<div class="manage-users-table__column">| Join</div>
<div class="manage-users-table__column">| Customer role</div>
<div class="manage-users-table__column">| Action</div>
</div>`;

export const manageDuesHtml = `
<div class="manage-users-table">
<div class="manage-users-table__column">| users</div>
<div class="manage-users-table__column">| Status</div>
<div class="manage-users-table__column">| Next Payment</div>
<div class="manage-users-table__column">| Grant access?</div>
<div class="manage-users-table__column">| </div>
</div>
`;
