# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts "Seeding with sample data..."
  create_user! email: "oliver@example.com", name: "Oliver Smith"
  puts "Done! Added Oliver Smith as User"
  create_category! category: "Example Category"
  puts "Done! Added Example Category"
  create_settings! name: "Example Site Name", password: "welcome123"
  puts "Done! Added Example Site Name"
end

def create_user!(options = {})
  attributes = options
  User.create! attributes
end

def create_category!(options = {})
  attributes = options
  Category.create! attributes
end

def create_settings!(options = {})
  attributes = options
  Settings.create! attributes
end
