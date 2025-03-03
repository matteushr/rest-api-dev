# Business Rules

- [ ] Transactions can be income or outcome
- [ ] Each transaction must have a title, amount, and type (income/outcome)
- [ ] Each transaction must be associated with a user session
- [ ] Users should be able to see their transaction history
- [ ] Users should be able to see their account balance

# Functional Requirements

- [x] Users must be able to create new transactions
- [ ] Users should be able to see metrics from their account (balance, spendings, etc.)
- [ ] Users must be able to list all their transactions
- [ ] Users must be able to get details of a specific transaction
- [ ] Users must be able to delete transactions
- [ ] Users must be able to update transaction details

# Non-Functional Requirements

## Performance

- [ ] System should handle at least 100 concurrent users
- [ ] Database queries should be optimized for quick responses

## Security
- [ ] All endpoints must be protected with authentication
- [ ] MFA authentication is mandatory
- [ ] Sensitive data must be encrypted
- [ ] Input validation must be implemented for all user inputs

## Reliability
- [ ] System must have 99.9% uptime
- [ ] Data must be consistently backed up
- [ ] System must handle errors robustly

## Scalability
- [ ] System should be able to scale horizontally
- [ ] Database should be able to handle growing data volume
- [ ] API should support rate limiting

## Maintainability
- [ ] Code must follow clean code nor SOLID principles
- [ ] Documentation must be up to date
- [ ] System must be modular and easy to modify

## Usability
- [ ] API must follow RESTful conventions
- Error messages must be clear and helpful
- API must provide proper status codes

#