# frozen_string_literal: true

require "test_helper"

class SettingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @settings = Settings.create(name: "Spinkart", password: "Welcome123")
  end

  def test_site_name_should_not_be_valid_without_title
    @settings.name = ""
    assert_not @settings.valid?
  end

  def test_settings_should_have_unique_auth_token
    @settings.save!
    second_user = Settings.create(name: "Spinkart2", password: "Welcome1234")

    assert_not_same @settings.authentication_token,
      second_user.authentication_token
  end
end
