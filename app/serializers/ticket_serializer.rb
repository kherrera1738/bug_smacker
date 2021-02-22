class TicketSerializer < ActiveModel::Serializer
  attributes :title, :description, :priority, :status, :ticket_type, :created_at, :updated_at, :assignedDev, :project, :comments, :histories, :submittedBy
  def assignedDev
    (object.assigned_dev && object.assigned_dev.name) || "None"
  end

  def project
    object.project.name
  end

  def submittedBy
    (object.submitted_by && object.submitted_by.name) || "None"
  end

  def comments
    comments = []
    object.comments.each do |comment|
      comments.push({
        content: comment.content,
        madeBy: comment.made_by.name,
        createdAt: comment.created_at.strftime("%b-%d-%Y, %I:%M %p")
      })
    end
    return comments
  end

  def histories
    histories = []
    object.histories.each do |history|
      histories.push({
        changeType: history.change_type,
        oldVal: history.old_value,
        newVal: history.new_value,
        changeDate: history.created_at.strftime("%b-%d-%Y, %I:%M %p")
      })
    end
    return histories
  end

  def created_at
    object.created_at.strftime("%b-%d-%Y, %I:%M %p")
  end

  def updated_at
    object.created_at.strftime("%b-%d-%Y, %I:%M %p")
  end
end
