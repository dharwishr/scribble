# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_should_update_valid_organization_name
    put organization_path(@organization.id),
      params: {
        organization: {
          name: @organization.name, password: @organization.password,
          is_password_enabled: true
        }
      },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_updated", entity: "Organization")
  end

  def test_password_should_contain_minimum_number_of_characters
    put organization_path(@organization.id),
      params: { organization: { name: "Organization Name", password: "123", is_password_enabled: true } },
      headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Password is too short (minimum is 6 characters)"
  end

  def test_user_can_update_organization_fields
    new_name = "#{@organization.name}-(updated)"
    new_password = "#{@organization.password}-(updated)"
    organization_params = { organization: { name: new_name, password: new_password } }

    put organization_path(@organization.id), params: organization_params, headers: headers
    assert_response :success
    @organization.reload
    assert_equal @organization.name, new_name
    assert @organization.reload.authenticate(new_password)
  end
end
