class ProjectSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :tickets, :description, :teamMembers, :manageTeamUrl
  
  def manageTeamUrl
    manage_team_dashboard_path(object.id)
  end

  def teamMembers
    teamMembers = []
    object.team_members.each do |member|
      teamMembers.push({
        name: member.user.name,
        email: member.user.email,
        role: object.organization.positions.find_by(filled_by_id: member.user_id).role
      })
    end
    return teamMembers
  end

  def tickets
    tickets = []
    object.tickets.each do |ticket|
      tickets.push({
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        type: ticket.ticket_type,
        url: ticket_dashboard_path(ticket.id)
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
