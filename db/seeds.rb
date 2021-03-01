# # Create a main user
# User.create!(name:  "Kevyn Herrera",
#   email: "kevynherrera1738@gmail.com",
#   password: 'password',
#   password_confirmation: "password")

# pm = User.create!(name:  "PM",
#   email: "pm@gmail.com",
#   password: 'password',
#   password_confirmation: "password")

# dev = User.create!(name:  "dev",
#   email: "dev@gmail.com",
#   password: 'password',
#   password_confirmation: "password")

# # Generate other users
# 99.times do |n|
# name  = Faker::Name.name
# email = "example-#{n+1}@example.com"
# User.create!(name:  name,
#   email: email,
#   password: "password",
#   password_confirmation: "password")
# end

# # Create organizations
# users = User.order(:created_at).take(20)
# 3.times do |n|
#   users.each do |user| 
#     org = user.owned_organizations.create!(name: "#{user.name}-org-#{n}") 
#     org.positions.create!(role: "PM", filled_by: pm) 
#     org.positions.create!(role: "Dev", filled_by: dev)
#   end 
# end

# # Add roles
# organizations = Organization.order(:created_at).take(10)
# 5.times do |n|
#   role = %W{ Admin PM Dev Submitter }.sample
#   user = User.all.sample
#   while user.name != "Kevyn Herrera"
#     user = User.all.sample
#   end
#   organizations.each do |org| 
#     description = "Sample project for #{org.name}"
#     project = org.projects.create!(name: "#{org.name}-proj-#{n}", description: description)
#     if !org.positions.where(filled_by: user).exists?
#       org.positions.create!(role: role, filled_by: user) 
#       project.team_members.create!(user: user)
#     end
#   end
# end

# # Create tickets
# projects = Project.order(:created_at).take(10)
# 7.times do |n|
#   t_type = ["bug/errors", "feature requests", "comments", "training/document requests"].sample
#   t_priority = ["low", "medium", "high"].sample 
#   t_status = ["new", "open", "in progress", "resolved", "additional information required"].sample
#   projects.each do |proj|
#     title = "sample-ticket-#{n}"
#     description = "sample description"
#     assigned_dev = proj.team_members.sample.user
#     proj.tickets.create!(title: title,
#                         description: description,
#                         priority: t_priority,
#                         ticket_type: t_type,
#                         status: t_status,
#                         assigned_dev: assigned_dev)
#   end
# end

# tickets = Ticket.all
# tickets.each do |ticket|
#   rand(7..20).times do  
#     comment_content = Faker::Lorem.sentence(word_count: rand(5..15))
#     comment_user = ticket.project.team_members.sample.user
#     ticket.comments.create!(content: comment_content, made_by: comment_user)
#   end

#   pms = ticket.project.organization.positions.where(role: "PM")
  
#   changed_by = pms.sample.filled_by
#   change_type = "title"
#   old_value = Faker::Lorem.sentence(word_count: rand(2..5))
#   new_value = ticket.title
#   ticket.histories.create!(changed_by: changed_by, 
#                             old_value: old_value, 
#                             new_value: new_value, 
#                             change_type: change_type)

#   changed_by = pms.sample.filled_by
#   change_type = "description"
#   old_value = Faker::Lorem.sentence(word_count: rand(2..5))
#   new_value = Faker::Lorem.sentence(word_count: rand(2..5))
#   ticket.histories.create!(changed_by: changed_by, 
#                           old_value: old_value, 
#                           new_value: new_value, 
#                           change_type: change_type)
  
#   changed_by = pms.sample.filled_by
#   change_type = "priority"
#   old_value = "low"
#   new_value = ticket.priority
#   ticket.histories.create!(changed_by: changed_by, 
#                           old_value: old_value, 
#                           new_value: new_value, 
#                           change_type: change_type)

#   changed_by = pms.sample.filled_by
#   change_type = "status"
#   old_value = "new"
#   new_value = "open"
#   ticket.histories.create!(changed_by: changed_by, 
#                           old_value: old_value, 
#                           new_value: new_value, 
#                           change_type: change_type)
  
#   changed_by = pms.sample.filled_by
#   change_type = "description"
#   old_value = Faker::Lorem.sentence(word_count: rand(2..5))
#   new_value = ticket.description
#   ticket.histories.create!(changed_by: changed_by, 
#                           old_value: old_value, 
#                           new_value: new_value, 
#                           change_type: change_type)

#   changed_by = pms.sample.filled_by
#   change_type = "status"
#   old_value = "open"
#   new_value = ticket.status
#   ticket.histories.create!(changed_by: changed_by, 
#                           old_value: old_value, 
#                           new_value: new_value, 
#                           change_type: change_type)

#   changed_by = pms.sample.filled_by
#   change_type = "assigned dev"
#   old_value = ticket.project.team_members.sample.user.name
#   new_value = ticket.assigned_dev.name
#   ticket.histories.create!(changed_by: changed_by, 
#                           old_value: old_value, 
#                           new_value: new_value, 
#                           change_type: change_type)
# end

# Create a main user
trail_user = User.create!(name:  "Trial User",
  email: "trail@example.com",
  password: 'fiddlecatwhiteblack',
  password_confirmation: "fiddlecatwhiteblack")

# Generate organization
trail_org = Organization.create!(name: "Sample Organization", owner_id: trail_user.id)
trail_org.positions.create(role: "Admin", filled_by_id: trail_user.id)

def generate_code(number)
  charset = Array('A'..'Z') + Array('a'..'z')
  Array.new(number) { charset.sample }.join
end

# Generate other users
20.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@example.com"
  password = generate_code(20)
  user = User.create!(name:  name,
    email: email,
    password: password,
    password_confirmation: password)
  
  # Add other positions
  role = ["PM", "Dev", "Submitter"].sample
  trail_org.positions.create(role: role, filled_by_id: user.id)
end

# Generate sample projects
5.times do |pn|
  p "generating project #{pn}"
  project = trail_org.projects.create(name: "sample-project-#{pn}", 
    description: Faker::Lorem.sentence(word_count: rand(15..30)))
  project.team_members.create(user_id: trail_user.id)
  added_users = [trail_user]

  # Add team
  5.times do
    new_user = User.all.sample
    while added_users.include? new_user
      new_user = User.all.sample
    end
    project.team_members.create(user_id: new_user.id)
    added_users.push(new_user)
  end

  # Add tickets
  15.times do |tn|
    p "generating ticket #{tn}"
    title = "sample-ticket-#{pn}-#{tn}"
    description = Faker::Lorem.sentence(word_count: rand(15..30))
    submitted_by = project.team_members.sample.user
    
    # Give tickets chance of having no assigned dev
    assigned_dev = nil
    if rand(0..6) < 6 
      assigned_dev = project.team_members.sample.user
    end

    t_type = ["bug/errors", "feature requests", "comments", "training/document requests"].sample
    t_priority = ["low", "medium", "high"].sample 
    t_status = ["new", "open", "in progress", "resolved", "additional information required"].sample

    ticket = project.tickets.create(title: title, 
      description: description, 
      priority: t_priority,
      status: t_status,
      ticket_type: t_type,
      submitted_by: submitted_by,
      assigned_dev: assigned_dev
    )

    # Add comments to ticket
    rand(7..20).times do
      p "adding comment"  
      comment_content = Faker::Lorem.sentence(word_count: rand(5..15))
      comment_user = project.team_members.sample.user
      ticket.comments.create!(content: comment_content, made_by: comment_user)
    end

    # Add history to ticket
    rand(7..20).times do
      p "adding history"
      changed_by = project.team_members.sample.user
      change_type = ["assigned dev", "priority", "title", "description", "status", "ticket type" ].sample
      
      old_value = ""
      new_value = ""
      case change_type
      when "title"
        old_value = Faker::Lorem.sentence(word_count: rand(2..4))
        new_value = ticket.title
      when "description"
        old_value = Faker::Lorem.sentence(word_count: rand(15..30))
        new_value = ticket.description
      when "priority"
        old_value = ["low", "medium", "high"].sample 
        new_value = ticket.priority
        while old_value == new_value
          old_value = ["low", "medium", "high"].sample
        end
      when "assigned dev"
        old_value = project.team_members.sample.user.name
        new_value = (ticket.assigned_dev && ticket.assigned_dev.name) || nil
        while old_value == new_value
          old_value = project.team_members.sample.user
        end
      when "status"
        old_value = ["new", "open", "in progress", "resolved", "additional information required"].sample
        new_value = ticket.status
        while old_value == new_value
          old_value = ["new", "open", "in progress", "resolved", "additional information required"].sample
        end
      when "ticket type"
        old_value = ["bug/errors", "feature requests", "comments", "training/document requests"].sample
        new_value = ticket.ticket_type
        while old_value == new_value
          old_value = ["bug/errors", "feature requests", "comments", "training/document requests"].sample
        end
      else
        p "Error, unknown value"
      end

      old_value ||= "None"
      new_value ||= "None"

      ticket.histories.create!(changed_by: changed_by, 
                                old_value: old_value, 
                                new_value: new_value, 
                                change_type: change_type)
    end
  end
end

