# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = Organization.create(name: "Spinkart", password: "Welcome123")
  end

  def test_organization_name_should_not_be_valid_without_name
    @organization.name = ""
    assert_not @organization.valid?
  end

  def test_organization_should_have_unique_auth_token
    @organization.save!
    second_organization = Organization.create(name: "Spinkart2", password: "Welcome1234")

    assert_not_same @organization.authentication_token,
      second_organization.authentication_token
  end
end
