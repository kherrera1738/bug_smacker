json.extract! comment, :id, :ticket_id, :made_by_id, :content, :created_at, :updated_at
json.url comment_url(comment, format: :json)
