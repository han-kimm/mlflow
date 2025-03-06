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

FROM python:3.9-slim-bullseye AS py-builder

WORKDIR /mlflow
COPY . .
COPY --from=ui-builder /mlflow/build /mlflow/mlflow/server/js/build

RUN pip install --no-cache-dir setuptools wheel

RUN python -m pip wheel . --no-deps --wheel-dir ./wheels

##############################################################################
# STAGE 3: Final Image
##############################################################################

FROM python:3.9-slim-bullseye

WORKDIR /mlflow

COPY --from=py-builder /mlflow/wheels /mlflow/wheels

RUN pip install --no-cache-dir /mlflow/wheels/*.whl

EXPOSE 5000

CMD mlflow server -h 0.0.0.0