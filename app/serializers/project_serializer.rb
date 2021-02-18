class ProjectSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :info, :tickets
  
  def info
    priorities = {
      "low" => 0,
      "medium" => 0,
      "high" => 0
    }
    status = {
      "new" => 0,
      "open" => 0,
      "in progress" => 0,
      "resolved" => 0,
      "additional information required" => 0
    }
    t_types = {
      "bug/errors" => 0,
      "features requests" => 0,
      "comments" => 0,
      "training/document requests" => 0
    }
    assigned = Hash.new(0)
    object.tickets.each do |ticket|
      priorities[ticket.priority] += 1
      status[ticket.status] += 1
      t_types[ticket.ticket_type] += 1
      assigned[ticket.assigned_dev.name || "None"] += 1
    end

    {
      assigned: convert_to_chart_format(assigned),
      types: convert_to_chart_format(t_types),
      statuses: convert_to_chart_format(status),
      priorities: convert_to_chart_format(priorities)
    }
  end

  def tickets
    tickets = []
    object.tickets.each do |ticket|
      tickets.push({
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        type: ticket.type
        url: ticket_path(ticket.id)
      })
    end
    return tickets
  end

  def convert_to_chart_format(data)
    return {
      labels: data.keys,
      data: data.values
    }
  end
end
