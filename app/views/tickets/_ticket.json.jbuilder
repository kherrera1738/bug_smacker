json.extract! ticket, :id, :title, :description, :project_id, :priority, :status, :ticket_type, :created_at, :updated_at
json.url ticket_url(ticket, format: :json)
