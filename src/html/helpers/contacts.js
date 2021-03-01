module.exports = function (data, options) {
  let contacts = data.contacts
  let out = ''

  for (let i = 0, l = contacts.length; i < l; i++) {
    out += `<div class="col-sm-4">
      <div class="content-box contact">
        <h4><small>${(i < 10) ? '0' + (i+1) : i+1}</small><span>${contacts[i].name}</span></h4>
        <p>
          <span class="address">${contacts[i].address}</span>
          <span class="phone"><a href="tel:${contacts[i].phone}">${contacts[i].phone}</a></span>
          <span class="email"><a href="mailto:${contacts[i].email}">${contacts[i].email}</a></span>
          <span class="relationship">${contacts[i].relationship}</span>
        </p>
      </div>
    </div>`
  }

  return out
}
