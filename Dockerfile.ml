##############################################################################
# STAGE 1: UI Builder
##############################################################################

FROM --platform=$BUILDPLATFORM node:20.15-alpine AS ui-builder

WORKDIR /mlflow
COPY mlflow/server/js .
RUN yarn install --silent && yarn build

##############################################################################
# STAGE 2: Python Package Builder
##############################################################################

# FROM python:3.9-slim-bullseye AS py-builder

# WORKDIR /mlflow
# COPY . .
# COPY --from=ui-builder /mlflow/build /mlflow/mlflow/server/js/build

# RUN pip install --no-cache-dir setuptools wheel

# RUN python -m pip wheel . --no-deps --wheel-dir ./wheels

##############################################################################
# STAGE 3: Final Image
##############################################################################

FROM python:3.9-slim-bullseye

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn

WORKDIR /mlflow

RUN pip install --no-cache-dir mlflow boto3 pymysql

COPY --from=ui-builder /mlflow/build /usr/local/lib/python3.9/site-packages/mlflow/server/js/build


EXPOSE $PORT

CMD mlflow server \
  --host 0.0.0.0 \
  --port $PORT \
  --workers 1 \
  --backend-store-uri mysql+pymysql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME \
  --artifacts-destination s3://$BUCKET_NAME