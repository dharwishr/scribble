# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = create(:redirection)
  end

  def test_should_list_all_redirections
    get redirections_path, headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["redirections"].length, Redirection.count
  end

  def test_redirection_uniqueness
    test_redirection2 = Redirection.new from: @redirection.from, to: "test"
    assert_not test_redirection2.valid?
  end

  def test_is_redirection_works
    get @redirection.from
    assert_redirected_to @redirection.to
  end
end
