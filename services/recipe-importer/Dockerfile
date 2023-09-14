FROM python:3.9

WORKDIR /

COPY ./ /

RUN python3 -m pip install --user pipenv

RUN pipenv install



CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]