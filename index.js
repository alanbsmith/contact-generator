const fs = require('fs');
const faker = require('faker');
const os = require('os');
const minimist = require('minimist');

let args = minimist(process.argv.slice(2), {
  alias: {
    c: 'count',
    p: 'path',
    f: 'format',
    a: 'attrs',
  }
});

function emailBuilder(firstName, lastName) {
  const formattedFirstName = firstName.replace(/'/g, '').replace(/\./g,"_").toLowerCase();
  const formattedLastName = lastName.replace(/'/g, '').replace(/\./g,"_").toLowerCase();
  const provider = faker.internet.email().match(/@\w+.\w+$/)[0];
  const separators = ['.', '_', ''];
  const separator = separators[Math.floor(Math.random() * separators.length)];
  return `${formattedFirstName}${separator}${formattedLastName}${provider}`;
}

function entryBuilder(attrs, entryIndex) {
  return attrs.reduce((acc, attr) => {
    if (attr === 'id') {
      return { ...acc, id: entryIndex + 1 }
    }
    if (attr === 'firstName') {
      const firstName = faker.name.firstName();
      return { ...acc, firstName };
    }
    if (attr === 'lastName') {
      return { ...acc, [attr]: faker.name.lastName() }
    }
    if (attr === 'email') {
      const firstName = acc.firstName || faker.name.firstName();
      const lastName = acc.lastName || faker.name.lastName();
      return { ...acc, [attr]: emailBuilder(firstName, lastName) }
    }
    if (attr === 'streetAddress') {
      return { ...acc, [attr]: faker.address.streetAddress() }
    }
    if (attr === 'city') {
      return { ...acc, [attr]: faker.address.city() }
    }
    if (attr === 'state') {
      return { ...acc, [attr]: faker.address.state() }
    }
    if (attr === 'zipCode') {
      return { ...acc, [attr]: faker.address.zipCode() }
    }
  }, {});
}

function csvGenerator(count, attrs) {
  let rows = [];
  rows.push(`${attrs.join()}`);

  for (let i = 0; i < count; i++) {
    const row = [];
    const entry = entryBuilder(attrs, i);
    for (let key in entry) {
      row.push(entry[key])
    }
    rows.push(`${row.join()}`);
  }

  return rows.join(os.EOL)
}

function jsonGenerator(count, attrs) {
  let entries = [];

  for (let i = 0; i < count; i++) {
    const entry = entryBuilder(attrs, i)
    entries.push(entry);
  }
  return JSON.stringify(entries);
}


function createFile(contacts, count, path, format) {
  const pathArr = path.split('/').slice(0,-1);
  let pathStep = '';
  for (let i = 0; i < pathArr.length; i++) {
    let dir = `${pathStep}${pathArr[i]}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    pathStep = `${dir}/`;
  }

  fs.writeFile(`${path}.${format}`, contacts, (err) => {
    if (err) throw err;
    console.log(`${count} contacts created!`)
  });
}

function contactGenerator({ count = 1000, path = `./data/contacts`, format = 'csv', attrs = ['id','firstName', 'lastName', 'email'] }) {
  let contacts = [];
  switch(format) {
    case 'csv':
      contacts = csvGenerator(count, attrs);
      break;
    case 'json':
      contacts = jsonGenerator(count, attrs);
    default:
    break;
  }

  createFile(contacts, count, path, format);
}

contactGenerator(args);
