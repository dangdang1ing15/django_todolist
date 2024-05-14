# 베이스 이미지 설정
FROM python:3.11

# 작업 디렉토리 설정
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "db:5432", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]