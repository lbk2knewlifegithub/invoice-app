export VERSION=1
api:
	nx build api --generatePackageJson=true
	docker build -t lbk2kdocker/api:${VERSION} -f api.Dockerfile ./
frontend:
	nx build frontend
	docker build -t lbk2kdocker/frontend:${VERSION} -f frontend.Dockerfile ./
push:
	docker push lbk2kdocker/frontend:${VERSION}
	docker push lbk2kdocker/api:${VERSION}
k8s:
	# envsubst < k8s/frontend.yaml | kubectl apply -f k8s/frontend.yaml
	kubectl apply -f k8s
	# kubectl set image deployment/frontend-deployment frontend=lbk2kdocker/frontend:${VERSION}
	# kubectl get pods

deploy: api frontend push

test:
	echo $$VERSION
	printenv | grep VERSION
