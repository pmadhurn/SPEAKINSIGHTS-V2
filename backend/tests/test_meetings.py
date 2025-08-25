def test_meetings_crud(client):
	# list empty
	r = client.get("/api/v1/meetings/")
	assert r.status_code == 200
	assert isinstance(r.json(), list)

	# create
	payload = {"title": "Unit Test Meeting"}
	r = client.post("/api/v1/meetings/", json=payload)
	assert r.status_code == 201
	meeting = r.json()
	mid = meeting["id"]

	# get
	r = client.get(f"/api/v1/meetings/{mid}")
	assert r.status_code == 200

	# update
	r = client.patch(f"/api/v1/meetings/{mid}", json={"status": "done"})
	assert r.status_code == 200
	assert r.json()["status"] == "done"

	# delete
	r = client.delete(f"/api/v1/meetings/{mid}")
	assert r.status_code == 204


