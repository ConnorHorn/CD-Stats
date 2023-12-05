function extractUserData(jsonString) {
    // Parse the JSON string
    let data = jsonString;

    // Extract the required fields
    let username = data.user.username;
    let admin = data.user.admin;
    let badge_count = data.user.badge_count;
    let user_field_1 = data.user.user_fields["1"];
    let profile_view_count = data.user.profile_view_count;
    let second_factor_enabled = data.user.second_factor_enabled;
    let associated_accounts = data.user.associated_accounts;
    let muted_usernames = data.user.muted_usernames;
    let ignored_usernames = data.user.ignored_usernames;

    // Return an object with the extracted data
    console.log(username, admin, badge_count, user_field_1, profile_view_count, second_factor_enabled, associated_accounts, muted_usernames, ignored_usernames);
    return {
        username,
        admin,
        badge_count,
        user_field_1,
        profile_view_count,
        second_factor_enabled,
        associated_accounts,
        muted_usernames,
        ignored_usernames
    };
}

export { extractUserData}
