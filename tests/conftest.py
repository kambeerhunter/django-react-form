import pytest
from tests.factories import UserFactory


@pytest.fixture(autouse=True)
def create_base_users():
    for i in range(3):
        UserFactory()
