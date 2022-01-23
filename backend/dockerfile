FROM python:3.9.0-alpine

ADD requirements.txt /requirements.txt

RUN pip install -r requirements.txt

ADD main.py /main.py

EXPOSE 80
CMD uvicorn main:app --host 0.0.0.0 --port 80 --ws websockets