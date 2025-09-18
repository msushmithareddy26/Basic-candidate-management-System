**BASIC CANDIDATE MANAGEMENT SYSTEM**

A modern Candidate Management System built with Django, MySQL, and React. This project helps recruiters and HR teams manage candidate data efficiently while demonstrating industry-standard CRUD operations (Create, Read, Update, Delete) and API testing practices.

🚀 Features:

* Add new candidates with details (name, email, skills, experience, etc.)

* View the list of all candidates

* Update candidate information

* Delete candidates from the system

* Modern and responsive frontend built with React

* RESTful backend API using Django

* Persistent storage with MySQL

* Interactive API documentation with Swagger

* Unit testing for backend endpoints and frontend components

🛠️ Tech Stack:

Layer => Technology

Frontend => React 18+

Backend => Django (Python 3.11+)

Database => MySQL

API Docs => Swagger (drf-yasg)

Version Control => Git & GitHub

📂 Project Structure:

Basic-candidate-management-system/

│── backend/ # Django backend (API + business logic)

│ ├── src/

│ ├── requirements.txt

│ └── manage.py

│── frontend/ # React frontend (UI)

│ ├── src/

│ └── package.json

│── README.md # Project documentation


⚙️ Installation & Setup:

🔹 Backend Setup (Django + MySQL):

1)Navigate to the backend folder:

    cd backend
 
2)Create and activate a virtual environment:

    python -m venv venv
    source venv/bin/activate   # Linux/Mac
    venv\Scripts\activate      # Windows
    
3)Install dependencies:

    pip install -r requirements.txt
    
4)Configure MySQL database settings in settings.py:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'candidate_db',
            'USER': 'root',
            'PASSWORD': 'yourpassword',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }
    
5)Run database migrations:

    python manage.py migrate
    
6)Start the backend server:

     python manage.py runserver

     
🔹 Frontend Setup (React):

1)Navigate to the frontend folder:

    cd frontend
2)Install dependencies:

    npm install
    
3)Start the React development server:

    npm start
    
📝 API Documentation & Testing:

🔹 Swagger (OpenAPI) Integration:

1)Install Swagger dependency:

    pip install drf-yasg
    
2)Add drf_yasg to INSTALLED_APPS in settings.py:

      INSTALLED_APPS = [
          ...
          'rest_framework',
          'drf_yasg',
      ]
      
3)Configure Swagger in urls.py:
    
    from rest_framework import permissions
    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi
    from django.urls import path, re_path
    
    schema_view = get_schema_view(
        openapi.Info(
            title="Candidate Management API",
            default_version='v1',
            description="API documentation for managing candidates",
        ),
        public=True,
        permission_classes=[permissions.AllowAny],
    )
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]
    
4)Access Swagger UI at:

    http://localhost:8000/swagger/
Use Swagger to test all backend endpoints including POST, GET, PUT, and DELETE requests.

🔹 Unit Testing:

1)Backend: Test API endpoints to ensure data is handled correctly.

    from django.test import TestCase
    from rest_framework.test import APIClient

    class CandidateTests(TestCase):
        def setUp(self):
            self.client = APIClient()
    
        def test_create_candidate(self):
            data = {"name": "John Doe", "email": "john@example.com"}
            response = self.client.post("/api/candidates/", data, format='json')
            self.assertEqual(response.status_code, 201)
            
2)Frontend: Test individual React components for proper rendering and functionality.

    import { render, screen } from '@testing-library/react';
    import CandidateForm from './CandidateForm';
    
    test('renders name and email fields', () => {
      render(<CandidateForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });
    
📸 Screenshots:

<img width="2009" height="914" alt="image" src="https://github.com/user-attachments/assets/43630af0-c59e-4670-b847-f03ef0563300" />

<img width="2028" height="871" alt="image" src="https://github.com/user-attachments/assets/ed7e4669-865f-4158-8832-1e49c09b0b41" />

<img width="2480" height="1257" alt="image" src="https://github.com/user-attachments/assets/b30f1252-814e-465c-90bb-56cb36765604" />


🤝 Contributing:

-Fork the repository

-Create a new branch (feature-branch)

-Commit your changes with descriptive messages

-Push to your branch

-Open a Pull Request


📜 License:

This project is licensed under the MIT License.


👩‍💻 Author

Sushmitha Reddy

https://github.com/msushmithareddy26
