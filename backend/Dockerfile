# 
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10


WORKDIR /app/

#install poetry dependecy management 
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false


COPY ./requirements.txt /code/requirements.txt

# 

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./pyproject.toml ./poetry.lock* /app/

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false
RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --only main ; fi"


COPY ./app /app/app

# 

CMD ["fastapi", "run", "app/main.py", "--port", "80"]