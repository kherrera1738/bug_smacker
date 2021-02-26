# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_26_182304) do

  create_table "comments", force: :cascade do |t|
    t.integer "ticket_id", null: false
    t.integer "made_by_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["made_by_id"], name: "index_comments_on_made_by_id"
    t.index ["ticket_id"], name: "index_comments_on_ticket_id"
  end

  create_table "histories", force: :cascade do |t|
    t.string "change_type"
    t.string "old_value"
    t.string "new_value"
    t.integer "changed_by_id"
    t.integer "ticket_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["changed_by_id"], name: "index_histories_on_changed_by_id"
    t.index ["ticket_id"], name: "index_histories_on_ticket_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.integer "owner_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["owner_id"], name: "index_organizations_on_owner_id"
  end

  create_table "positions", force: :cascade do |t|
    t.string "role"
    t.integer "filled_by_id", null: false
    t.integer "organization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["filled_by_id", "organization_id"], name: "index_positions_on_filled_by_id_and_organization_id", unique: true
    t.index ["filled_by_id"], name: "index_positions_on_filled_by_id"
    t.index ["organization_id"], name: "index_positions_on_organization_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "organization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["organization_id"], name: "index_projects_on_organization_id"
  end

  create_table "team_members", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "project_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["project_id"], name: "index_team_members_on_project_id"
    t.index ["user_id", "project_id"], name: "index_team_members_on_user_id_and_project_id", unique: true
    t.index ["user_id"], name: "index_team_members_on_user_id"
  end

  create_table "tickets", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "project_id", null: false
    t.string "priority"
    t.string "status"
    t.string "ticket_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "submitted_by_id"
    t.integer "assigned_dev_id"
    t.index ["assigned_dev_id"], name: "index_tickets_on_assigned_dev_id"
    t.index ["project_id"], name: "index_tickets_on_project_id"
    t.index ["submitted_by_id"], name: "index_tickets_on_submitted_by_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "provider"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "comments", "tickets"
  add_foreign_key "comments", "users", column: "made_by_id"
  add_foreign_key "histories", "tickets"
  add_foreign_key "organizations", "users", column: "owner_id"
  add_foreign_key "positions", "organizations"
  add_foreign_key "positions", "users", column: "filled_by_id"
  add_foreign_key "projects", "organizations"
  add_foreign_key "team_members", "projects"
  add_foreign_key "team_members", "users"
  add_foreign_key "tickets", "projects"
end
