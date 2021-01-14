# Contact Generator

## Up & Running

### Install Dependencies

```sh
npm install
```

### Generate Contacts

By default, this script will generate 1000 contacts and put it in `./data/contacts.csv`

```sh
node .
```

## Customization

There are a handful of things you can customize with this script:

- Contact Count `-c` or `-count`
- File Path `-path` or `-p`
- File Format `-format` or `-f`
- Contact Attributes `-attrs` or `-a`

### Contact Count

By default, this is set to 1000, but you can set it to any amount

```sh
node . -count=2000
# or
node . -c=2000
```

### File Path

By default, this is set to `./data/contacts.{fileFormat}`, but you can also provide a custom path. If a directory does not exist, the script will create it for you.

```sh
node . -path=data/json/contact-data
# or
node . -p=data/json/contact-data
```

### File Format

By default, this is set to `csv`, but you can also use `json`

```sh
node . -format=json
# or
node . -f=json
```

### - Contact Attributes

By default, `id`, `firstName`, `lastName`, and `email` attributes will be added to contacts, but you can provide any of the following:

- `id`
- `firstName`
- `lastName`
- `email`
- `city`
- `state`
- `zipCode`

```sh
node . -attrs={id,firstName,lastName,email,city,state,zipCode}
# or
node . -a={id,firstName,lastName,email,city,state,zipCode}
```
