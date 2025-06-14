The doer is the entity that performs the todo.

When creating or editing the doer. The firstname and lastname are required.

FirstName input. Input is required. 25 character limit.
Possible Error Messages: 'First Name is Required'. '25 Character Limit'
LastName input. Input is required. 25 character limit.
Possible Error Messages: 'First Name is Required'. '25 Character Limit'

Button. If the form is in creation mode then the button says create. If we are in edit mode than it says update.

If there is required or exceed-character-limit error. Than the button is disabled. Only when the form is without error that we have an enabled button.

## Doer Table

I want a list of doer tables.

There will be 4 columns. id, firstname and lastname, and total todos.

If there are no doers then instead of rows we will show: 'You currently do not have any doers.'

### Pagination

The doer table will have pagination. It will only show 5 doers at a time.

### Sorting

We will sort by id and last name and first name

### Unit test

I want testing. I want to test for no doers.
And test for sorting and pagination.

## Doer.stories.ts

This table will have a corresponding stores file.

The following scenarios.

- three doers
- no doers and therefore display the 'you currently do not have any doers'.
- 13 doers. But we display just five.
