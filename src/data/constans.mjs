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
      <input type="text" placeholder="name.." name="name" id="name" />
    </div>
    <div class="input-form-container">
      <label id="lastname"> Last name </label>
      <input type="text" placeholder="last name..." name="lastname" id="lastname" />
    </div>
    <div class="input-form-container">
      <label id="email"> email </label>
      <input type="text" placeholder="email..." name="email" id="email" />
    </div>
    <div class="input-form-container">
      <label id="admin"> its admin? </label>
      <input type="checkbox" id="admin" name="admin"/>
    </div>
    <button type="submit" id="form-button">Create</button>
  </form>
</div>`;

export const manageUsersHtml = `
<div class="manage-users-table">
<div class="manage-users-table__column">| users</div>
<div class="manage-users-table__column">| email</div>
<div class="manage-users-table__column">| Join</div>
<div class="manage-users-table__column">| isAdmin</div>
<div class="manage-users-table__column">| Action</div>
</div>`;
