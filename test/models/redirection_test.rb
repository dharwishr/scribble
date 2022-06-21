# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @redirection = Redirections.create(from: "test", to: "public")
  end

  def test_redirection_from_should_not_be_valid_without_from
    @redirection.from = ""
    assert_not @redirection.valid?
  end

  def test_redirection_from_and_to_should_not_be_valid_when_whitespace_input
    @redirection.from = " "
    @redirection.to = " "
    assert_not @redirection.valid?
  end
end
