# FastAPI Backend Project

This project is a FastAPI application designed to manage various functionalities including authentication, team management, tournament management, and user management. Below are the details regarding the structure and usage of the project.

## Project Structure

```
fastapi-backend
├── main.py                # Entry point of the FastAPI application
├── services               # Contains service files for business logic
│   ├── auth_service.py    # Functions related to authentication
│   ├── team_service.py     # Functions for managing teams
│   ├── tournament_service.py # Functions for managing tournaments
│   └── user_service.py     # Functions for user management
├── endpoints              # Contains endpoint definitions
│   ├── auth.py            # Authentication endpoints
│   ├── team.py            # Team management endpoints
│   ├── tournament.py       # Tournament management endpoints
│   └── user.py            # User management endpoints
└── models                 # Contains data models
    ├── auth.py            # Models related to authentication
    ├── team.py            # Models for teams
    ├── tournament.py       # Models for tournaments
    └── user.py            # Models for users
├── requirements.txt           # Lists dependencies for the project
├── README.md                  # Documentation for the project
```

## Setup Instructions

1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd fastapi-backend
   ```

2. **Create a Virtual Environment**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**
   ```
   pip install -r requirements.txt
   ```

4. **Run the Application**
   For development environment, run:
   ```
   fastapi dev main.py 
   ```
   For deployment environment, run:
   ```
   fastapi run main.py 
   ```
   
## Usage Guidelines

- **Authentication Endpoints**: Use the `/auth` endpoints for user login, registration, and logout.
- **Team Management**: Access the `/team` endpoints to edit, delete teams, and manage team members and scores.
- **Tournament Management**: Utilize the `/tona` endpoints for creating and managing tournaments and their teams.
- **User Management**: The `/user` endpoints allow for adding, promoting, demoting, and deleting users.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.