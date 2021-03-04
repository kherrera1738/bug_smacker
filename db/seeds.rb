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
  rand(7..10).times do |tn|
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

# Generate non project users
10.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+21}@example.com"
  password = generate_code(20)
  user = User.create!(name:  name,
    email: email,
    password: password,
    password_confirmation: password)
  
  # Add other positions
  role = ["PM", "Dev", "Submitter"].sample
  trail_org.positions.create(role: role, filled_by_id: user.id)
end