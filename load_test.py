from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)  # Simulate wait time between tasks

    @task
    def load_homepage(self):
        self.client.get("/")  # Simulate accessing the homepage
        
#locust -f load_test.py --host=https://zeribytecare.com
