# List of APIs

## authRouter
- POST /signup
- POST /login
- POST /logout
## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/changePassword
## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId

- POST /request/review/accept/:requestId
- POST /request/review/reject/:requestId

- GET user/connections
- GET user/feed
