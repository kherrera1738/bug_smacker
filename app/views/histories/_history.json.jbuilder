json.extract! history, :id, :change_type, :old_value, :new_value, :changed_by_id, :ticket_id, :created_at, :updated_at
json.url history_url(history, format: :json)
